package com.brunoicaro.DTO;

import java.sql.Date;

import com.brunoicaro.model.Titulo;

public record ItemRequestDTO(
    Long _id,
    Titulo titulo,
    Date dataAquisicao,
    String tipo
) {
}
