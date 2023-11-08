package com.brunoicaro.DTO;

import java.util.List;

import com.brunoicaro.model.Ator;
import com.brunoicaro.model.Classe;
import com.brunoicaro.model.Diretor;

public record TituloRequestDTO(
        Long _id,
        String nome,
        List<Ator> atores,
        Diretor diretor,
        int ano,
        String sinopse,
        String categoria,
        Classe classe
        ) {
}
