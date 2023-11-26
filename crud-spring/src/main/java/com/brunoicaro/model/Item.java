package com.brunoicaro.model;

import com.brunoicaro.DTO.ItemRequestDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Data
@Table(name = "item")
@Entity(name = "item")
@SQLDelete(sql = "UPDATE Item SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    @ManyToOne
    @Cascade({CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE})
    @JsonIgnoreProperties("itens")
    @JoinColumn(name = "titulo_id")
    private Titulo titulo;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dataAquisicao;

    @Column(nullable = false)
    private String tipo;

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    public Item(ItemRequestDTO data){
        this.id = data._id();
        this.titulo = data.titulo();
        this.dataAquisicao = data.dataAquisicao();
        this.tipo = data.tipo();
    }
}
