package com.brunoicaro.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.*;

import com.brunoicaro.DTO.ClienteRequestDTO;

import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Entity(name = "socio")
@SQLDelete(sql = "UPDATE Socio SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("Socio")
@EqualsAndHashCode(of = "id")
public class Socio extends Cliente implements Serializable {

    @Column(nullable = false, length = 5)
    private int numero;

    @Column(nullable = false, length = 150)
    private String rua;

    @Column(nullable = false, length = 150)
    private String bairro;

    @Column(nullable = false, length = 150)
    private String cidade;

    @Column(nullable = false, length = 150)
    private String estado;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false, length =14 , updatable = false)
    private String cpf;

    @OneToMany(mappedBy = "socio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Dependente> dependentes = new ArrayList<>();

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    public Socio(ClienteRequestDTO requestCliente) {
        super(requestCliente);
        this.cpf = requestCliente.cpf();
        this.telefone = requestCliente.telefone();
        this.numero = requestCliente.numero();
        this.rua = requestCliente.rua();
        this.bairro = requestCliente.bairro();
        this.cidade = requestCliente.cidade();
        this.estado = requestCliente.estado();
        this.dependentes = requestCliente.dependentes();
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setNumero(int numero) {    
        this.numero = numero;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setDependentes(List<Dependente> dependentes) {
        this.dependentes = dependentes;
    }

}
