package school.sptech.cinelumiere;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;

@CrossOrigin
@RestController
@RequestMapping("/sessoes")
public class SessaoController {
    private final JdbcTemplate template;

    public SessaoController(JdbcTemplate template) {
        this.template = template;
    }

    private boolean existePorId(Integer id) {
        String sql = "SELECT COUNT(*) FROM sessao WHERE id = ?";

        Integer quantidade = template.queryForObject(
                sql,
                Integer.class,
                id
        );
        return quantidade > 0;
    }

    private Integer buscarFilmeExistente(CadastroSessao cadastro) {
        String sql = """
                SELECT id FROM filme
                WHERE nome = ?
                AND diretor = ?
                AND ano = ?
                AND duracao = ?
                AND pais = ?
                """;
        try {
            return template.queryForObject(
                    sql,
                    Integer.class,
                    cadastro.getNome(),
                    cadastro.getDiretor(),
                    cadastro.getAno(),
                    cadastro.getDuracao(),
                    cadastro.getPais()
            );
        } catch (EmptyResultDataAccessException exception) {
            return null;
        }
    }

    private boolean existeHorarioNaSala(Integer sala, LocalTime horario) {
        String sql = """
                SELECT COUNT(*) FROM sessao
                WHERE sala = ?
                AND horario = ?
                """;

        Integer quantidade = template.queryForObject(
                sql,
                Integer.class,
                sala,
                horario
        );
        return quantidade > 0;
    }

    private boolean existeSessaoSobreposta(Integer sala, LocalTime horario, Integer duracao) {
        String sql = """
                SELECT * FROM sessao WHERE sala = ?;
                """;

        List<Sessao> sessoes = template.query(
                sql,
                new BeanPropertyRowMapper<>(Sessao.class),
                sala
        );

        LocalTime fimNovaSessao = horario.plusMinutes(duracao);

        for (Sessao sessao : sessoes) {
            String sqlDuracao = """
                    SELECT duracao
                    FROM filme
                    WHERE id = ?
                    """;
            Integer duracaoSessao = template.queryForObject(
                    sqlDuracao,
                    Integer.class,
                    sessao.getFilmeId()
            );
            LocalTime inicioSessao = sessao.getHorario();

            LocalTime fimSessao = inicioSessao.plusMinutes(duracaoSessao);

            if (horario.isBefore(fimSessao)
                    && fimNovaSessao.isAfter(inicioSessao)) {

                return true;
            }
        }
        return false;
    }

    private Integer gerarOcupacao() {
        Random random = new Random();

        return random.nextInt(41);
    }

    @GetMapping
    public ResponseEntity<List<Sessao>> listar() {
        String sql = "SELECT * FROM sessao";

        List<Sessao> sessoes = template.query(
                sql,
                new BeanPropertyRowMapper<>(Sessao.class)
        );
        return ResponseEntity.status(200).body(sessoes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sessao> buscarPorId(@PathVariable Integer id) {
        String sql = "SELECT * FROM sessao WHERE id = ?";
        try {
            Sessao sessao = template.queryForObject(
                    sql,
                    new BeanPropertyRowMapper<>(Sessao.class),
                    id
            );
            return ResponseEntity.status(200).body(sessao);

        } catch (EmptyResultDataAccessException exception) {
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping
    public ResponseEntity<Sessao> cadastrar(@RequestBody CadastroSessao cadastro) {
        if (cadastro.getSala() == null
                || cadastro.getSala() <= 0
                || cadastro.getHorario() == null
                || cadastro.getNome() == null
                || cadastro.getNome().isBlank()
                || cadastro.getDiretor() == null
                || cadastro.getDiretor().isBlank()
                || cadastro.getPais() == null
                || cadastro.getPais().isBlank()
                || cadastro.getAno() == null
                || cadastro.getAno() <= 0
                || cadastro.getDuracao() == null
                || cadastro.getDuracao() <= 0) {

            return ResponseEntity.status(400).build();
        }
        if (existeHorarioNaSala(cadastro.getSala(), cadastro.getHorario())) {
            return ResponseEntity.status(409).build();
        }

        Integer filmeId = buscarFilmeExistente(cadastro);

        Integer duracao = cadastro.getDuracao();

        if (filmeId != null) {
            duracao = buscarDuracaoFilme(filmeId);
        }

        if (existeSessaoSobreposta(
                cadastro.getSala(),
                cadastro.getHorario(),
                duracao)) {
            return ResponseEntity.status(409).build();
        }

        if (filmeId == null) {
            String sqlFilme = """
                    INSERT INTO filme (nome, diretor, ano, duracao, pais) VALUES (?, ?, ?, ?, ?)
                    """;

            KeyHolder keyHolder = new GeneratedKeyHolder();

            template.update(con -> {
                PreparedStatement statement = con.prepareStatement(
                        sqlFilme,
                        Statement.RETURN_GENERATED_KEYS
                );
                statement.setString(1, cadastro.getNome());
                statement.setString(2, cadastro.getDiretor());
                statement.setInt(3, cadastro.getAno());
                statement.setInt(4, cadastro.getDuracao());
                statement.setString(5, cadastro.getPais());

                return statement;
            }, keyHolder);
            filmeId = keyHolder.getKey().intValue();
        }

        Integer ocupacao = gerarOcupacao();

        Integer filmeIdSessao = filmeId;

        String sqlSessao = """
        INSERT INTO sessao (sala, horario, ocupacao, iniciada, filme_id) VALUES (?, ?, ?, ?, ?)
        """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        template.update(con -> {
            PreparedStatement statement = con.prepareStatement(
                    sqlSessao,
                    Statement.RETURN_GENERATED_KEYS
            );

            statement.setInt(1, cadastro.getSala());
            statement.setObject(2, cadastro.getHorario());
            statement.setInt(3, ocupacao);
            statement.setBoolean(4, false);
            statement.setInt(5, filmeIdSessao);

            return statement;
        }, keyHolder);

        Sessao sessao = new Sessao();

        sessao.setId(keyHolder.getKey().intValue());
        sessao.setSala(cadastro.getSala());
        sessao.setFilmeId(filmeId);
        sessao.setHorario(cadastro.getHorario());
        sessao.setOcupacao(ocupacao);
        sessao.setIniciada(false);

        return ResponseEntity.status(201).body(sessao);
    }

    private Integer buscarDuracaoFilme(Integer filmeId) {
        String sql = "SELECT duracao FROM filme WHERE id = ?";

        return template.queryForObject(
                sql,
                Integer.class,
                filmeId
        );
    }

    @PutMapping("/{id}/iniciar")
    public ResponseEntity<Sessao> iniciarSessao(@PathVariable Integer id) {
        if (!existePorId(id)) {
            return ResponseEntity.status(404).build();
        }

        Integer ocupacao = gerarOcupacao();

        String sql = """
            UPDATE sessao
            SET ocupacao = ?, iniciada = ?
            WHERE id = ?
            """;

        template.update(
                sql,
                ocupacao,
                true,
                id
        );
        Sessao sessao = buscarPorId(id).getBody();
        return ResponseEntity.status(200).body(sessao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (!existePorId(id)) {
            return ResponseEntity.status(404).build();
        }

        String sql = "DELETE FROM sessao WHERE id = ?";
        template.update(sql, id);
        return ResponseEntity.status(204).build();
    }
}