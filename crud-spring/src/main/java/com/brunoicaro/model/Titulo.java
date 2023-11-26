package com.brunoicaro.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brunoicaro.DTO.TituloRequestDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "titulo")
@Entity(name = "titulo")
@SQLDelete(sql = "UPDATE Titulo SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Titulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    @Column(length = 200, nullable = false)
    private String nome;
    
    @Column(length = 50, nullable = false)
    private String categoria;

    @Column(nullable = false)
    private int ano;

    @Column(length = 500, nullable = false)
    private String sinopse;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "titulo_ator",
            joinColumns = @JoinColumn(name = "titulo_id"),
            inverseJoinColumns = @JoinColumn(name = "ator_id"))
    @Cascade({CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE})
    private List<Ator> atores = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "diretor_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Diretor diretor;

    @ManyToOne
    @JoinColumn(name = "classe_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Classe classe;

    @OneToMany(mappedBy = "titulo")
    @Cascade({CascadeType.ALL})
    @JsonIgnoreProperties("titulo")
    private List<Item> itens = new ArrayList<>();

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    public Titulo(TituloRequestDTO data){
        this.id = data._id();
        this.nome = data.nome();
        this.atores = data.atores();
        this.diretor = data.diretor();
        this.ano = data.ano();
        this.sinopse = data.sinopse();
        this.categoria = data.categoria();
        this.classe = data.classe();
    }
    
}
