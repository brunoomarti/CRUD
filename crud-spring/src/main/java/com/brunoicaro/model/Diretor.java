package com.brunoicaro.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brunoicaro.DTO.DiretorRequestDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Table(name = "diretor")
@Entity(name = "diretor")
@SQLDelete(sql = "UPDATE Diretor SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Diretor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "diretor")
    private List<Titulo> titulos = new ArrayList<>();

    @Column(length = 200, nullable = false)
    private String nome;

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    public Diretor(DiretorRequestDTO data){
        this.id = data._id();
        this.nome = data.nome();
    }
}
