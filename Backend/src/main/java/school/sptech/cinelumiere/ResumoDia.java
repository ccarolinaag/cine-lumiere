package school.sptech.cinelumiere;

public class ResumoDia {
    private Integer publicoTotal;
    private Integer sessoesRealizadas;
    private Integer tempoPreparacao;
    private SessaoMaisCheia sessaoMaisCheia;

    public Integer getPublicoTotal() {
        return publicoTotal;
    }

    public void setPublicoTotal(Integer publicoTotal) {
        this.publicoTotal = publicoTotal;
    }

    public Integer getSessoesRealizadas() {
        return sessoesRealizadas;
    }

    public void setSessoesRealizadas(Integer sessoesRealizadas) {
        this.sessoesRealizadas = sessoesRealizadas;
    }

    public Integer getTempoPreparacao() {
        return tempoPreparacao;
    }

    public void setTempoPreparacao(Integer tempoPreparacao) {
        this.tempoPreparacao = tempoPreparacao;
    }

    public SessaoMaisCheia getSessaoMaisCheia() {
        return sessaoMaisCheia;
    }

    public void setSessaoMaisCheia(SessaoMaisCheia sessaoMaisCheia) {
        this.sessaoMaisCheia = sessaoMaisCheia;
    }
}
