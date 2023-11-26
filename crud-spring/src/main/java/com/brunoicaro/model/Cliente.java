package com.brunoicaro.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brunoicaro.DTO.ClienteRequestDTO;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.util.Date;

@Data
@Table(name = "cliente")
@Entity(name = "cliente")
@SQLDelete(sql = "UPDATE Cliente SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Inheritance(strategy = InheritanceType.JOINED)
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String sexo;

    @Column(name = "data_nascimento", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dataNascimento;

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    public Cliente(ClienteRequestDTO data) {
        this.id = data._id();
        this.nome = data.nome();
        this.sexo = data.sexo();
        this.dataNascimento = data.dataNascimento();
    }
    
}
