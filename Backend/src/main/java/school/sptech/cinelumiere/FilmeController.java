package school.sptech.cinelumiere;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@RestController
@RequestMapping("/filmes")
public class FilmeController {
    private final JdbcTemplate template;

    public FilmeController(JdbcTemplate template) {
        this.template = template;
    }

    private boolean existePorId(Integer id) {
        String sql = "SELECT COUNT(*) FROM filme WHERE id = ?";

        Integer quantidade = template.queryForObject(
                sql,
                Integer.class,
                id
        );
        return quantidade > 0;
    }

    @GetMapping()
    public ResponseEntity<List<Filme>> listar() {
        String sql = "SELECT * FROM filme";
        List<Filme> filmes = template.query(
                sql,
                new BeanPropertyRowMapper<>(Filme.class)
        );
        return ResponseEntity.status(200).body(filmes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarPorId(@PathVariable Integer id) {
        String sql = "SELECT * FROM filme WHERE id = ?";
        try {
            Filme filme = template.queryForObject(
                    sql,
                    new BeanPropertyRowMapper<>(Filme.class),
                    id
            );
            return ResponseEntity.status(200).body(filme);
        } catch (EmptyResultDataAccessException exception) {
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping
    private ResponseEntity<Filme> cadastrar(@RequestBody Filme filmeParaCadastro) {
        if (filmeParaCadastro.getNome() == null || filmeParaCadastro.getNome().isBlank()
                || filmeParaCadastro.getDiretor() == null || filmeParaCadastro.getDiretor().isBlank()
                || filmeParaCadastro.getPais() == null || filmeParaCadastro.getPais().isBlank()) {

            return ResponseEntity.status(400).build();
        }

        if (filmeParaCadastro.getAno() <= 0 || filmeParaCadastro.getDuracao() <= 0) {
            return ResponseEntity.status(400).build();
        }

        try {
            String sql = "INSERT INTO filme(nome, diretor, ano, duracao, pais) VALUES (?, ?, ?, ?, ?)";

            KeyHolder keyHolder = new GeneratedKeyHolder();

            template.update(con -> {
                PreparedStatement statement = con.prepareStatement(
                        sql,
                        Statement.RETURN_GENERATED_KEYS
                );

                statement.setString(1, filmeParaCadastro.getNome());
                statement.setString(2, filmeParaCadastro.getDiretor());
                statement.setInt(3, filmeParaCadastro.getAno());
                statement.setInt(4, filmeParaCadastro.getDuracao());
                statement.setString(5, filmeParaCadastro.getPais());

                return statement;
            }, keyHolder);

            int idGerado = keyHolder.getKey().intValue();
            filmeParaCadastro.setId(idGerado);

            return ResponseEntity.status(201).body(filmeParaCadastro);

        } catch (DuplicateKeyException exception) {
            return ResponseEntity.status(409).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> atualizar(
            @PathVariable Integer id,
            @RequestBody Filme filmeParaAtualizacao) {

        if (!existePorId(id)) {
            return ResponseEntity.status(404).build();
        }

        if (filmeParaAtualizacao.getNome() == null
                || filmeParaAtualizacao.getNome().isBlank()
                || filmeParaAtualizacao.getDiretor() == null
                || filmeParaAtualizacao.getDiretor().isBlank()
                || filmeParaAtualizacao.getPais() == null
                || filmeParaAtualizacao.getPais().isBlank()) {

            return ResponseEntity.status(400).build();
        }

        if (filmeParaAtualizacao.getAno() <= 0) {
            return ResponseEntity.status(400).build();
        }

        String sql = """
        UPDATE filme
        SET nome = ?, diretor = ?, ano = ?, pais = ?
        WHERE id = ?
        """;

        template.update(
                sql,
                filmeParaAtualizacao.getNome(),
                filmeParaAtualizacao.getDiretor(),
                filmeParaAtualizacao.getAno(),
                filmeParaAtualizacao.getPais(),
                id
        );
        filmeParaAtualizacao.setId(id);
        return ResponseEntity.status(200).body(filmeParaAtualizacao);
    }
}
