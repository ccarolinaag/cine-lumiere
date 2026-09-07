package school.sptech.cinelumiere;

import java.time.LocalTime;

public class SessaoMaisCheia {
    private String filme;
    private Integer sala;
    private LocalTime horario;
    private Integer espectadores;
    private Integer capacidade;
    private Double ocupacao;

    public String getFilme() {
        return filme;
    }

    public void setFilme(String filme) {
        this.filme = filme;
    }

    public Integer getSala() {
        return sala;
    }

    public void setSala(Integer sala) {
        this.sala = sala;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }

    public Integer getEspectadores() {
        return espectadores;
    }

    public void setEspectadores(Integer espectadores) {
        this.espectadores = espectadores;
    }

    public Integer getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(Integer capacidade) {
        this.capacidade = capacidade;
    }

    public Double getOcupacao() {
        return ocupacao;
    }

    public void setOcupacao(Double ocupacao) {
        this.ocupacao = ocupacao;
    }
}
