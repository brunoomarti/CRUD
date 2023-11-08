package com.brunoicaro.DTO;

import java.util.List;
import java.util.Set;

import com.brunoicaro.model.Ator;
import com.brunoicaro.model.Classe;
import com.brunoicaro.model.Diretor;
import com.brunoicaro.model.Titulo;

public record TituloResponseDTO(
    Long _id,
    String nome,
    List<Ator> atores,
    Diretor diretor,
    int ano,
    String sinopse,
    String categoria,
    Classe classe
) {
    public TituloResponseDTO(Titulo titulo){
        this(
                titulo.getId(),
                titulo.getNome(),
                titulo.getAtores(),
                titulo.getDiretor(),
                titulo.getAno(),
                titulo.getSinopse(),
                titulo.getCategoria(),
                titulo.getClasse()
        );
    }
}
