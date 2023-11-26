package com.brunoicaro.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brunoicaro.DTO.ClienteRequestDTO;
import com.brunoicaro.DTO.SocioRequestDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Table(name = "socio")
@Entity(name = "socio")
@SQLDelete(sql = "UPDATE Socio SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Socio extends Cliente {

    @Column(nullable = false)
    private int numero;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String cidade;

    @Column(nullable = false)
    private String estado;

    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String cpf;

    @OneToMany(mappedBy = "socio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Dependente> dependentes = new ArrayList<>();

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    public Socio(SocioRequestDTO data) {
        this.numero = data.numero();
        this.rua = data.rua();
        this.bairro = data.bairro();
        this.cidade = data.cidade();
        this.estado = data.estado();
        this.telefone = data.telefone();
        this.cpf = data.cpf();
        this.dependentes = data.dependentes();
    }

}
