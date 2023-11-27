package com.brunoicaro.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brunoicaro.DTO.ClienteRequestDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity(name = "cliente")
@SQLDelete(sql = "UPDATE Cliente SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_cliente")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Socio.class, name = "Socio"),
        @JsonSubTypes.Type(value = Dependente.class, name = "Dependente")
})
public abstract class Cliente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    @Column(length = 50)
    private String numInscricao;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String sexo;

    @Column(name = "data_nascimento", nullable = false, updatable = false)
    @Temporal(TemporalType.DATE)
    private Date dataNascimento;

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    @JsonProperty("tipoCliente")
    private String tipo;

    public Cliente(ClienteRequestDTO requestCliente) {
        this.numInscricao = requestCliente.numInscricao();
        this.nome = requestCliente.nome();
        this.dataNascimento = requestCliente.getDataNascimento();
        this.sexo = requestCliente.sexo();
        this.status = requestCliente.status();
        this.tipo = requestCliente.tipoCliente();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNumInscricao(String numInscricao) {
        this.numInscricao = numInscricao;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public void setStatus(String status) {
        status = status;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }
    
}
