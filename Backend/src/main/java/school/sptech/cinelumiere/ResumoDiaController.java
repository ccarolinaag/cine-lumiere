package school.sptech.cinelumiere;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resumo-dia")
public class ResumoDiaController {

    private final JdbcTemplate template;

    public ResumoDiaController(JdbcTemplate template) {
        this.template = template;
    }

    @GetMapping
    public ResponseEntity<ResumoDia> buscarResumo(
            @RequestParam Integer quantidadePreparacoes) {

        String sqlPublico = """
                SELECT SUM(ocupacao)
                FROM sessao
                WHERE iniciada = true
                """;

        Integer publicoTotal = template.queryForObject(
                sqlPublico,
                Integer.class
        );

        String sqlSessoes = """
                SELECT COUNT(*)
                FROM sessao
                WHERE iniciada = true
                """;

        Integer sessoesRealizadas = template.queryForObject(
                sqlSessoes,
                Integer.class
        );

        Integer tempoPreparacao = quantidadePreparacoes * 30;

        String sqlSessaoMaisCheia = """
                SELECT
                    f.nome AS filme,
                    s.sala,
                    s.horario,
                    s.ocupacao AS espectadores,
                    40 AS capacidade,
                    (s.ocupacao * 100.0 / 40) AS ocupacao
                FROM sessao s
                JOIN filme f ON s.filme_id = f.id
                WHERE s.iniciada = true
                ORDER BY s.ocupacao DESC
                LIMIT 1
                """;

        SessaoMaisCheia sessaoMaisCheia = template.queryForObject(
                sqlSessaoMaisCheia,
                new BeanPropertyRowMapper<>(SessaoMaisCheia.class)
        );

        ResumoDia resumo = new ResumoDia();

        resumo.setPublicoTotal(publicoTotal);
        resumo.setSessoesRealizadas(sessoesRealizadas);
        resumo.setTempoPreparacao(tempoPreparacao);
        resumo.setSessaoMaisCheia(sessaoMaisCheia);

        return ResponseEntity.status(200).body(resumo);
    }
}