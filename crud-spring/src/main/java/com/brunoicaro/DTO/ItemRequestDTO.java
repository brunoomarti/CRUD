package com.brunoicaro.DTO;

import java.sql.Date;

import com.brunoicaro.model.Titulo;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;

public record ItemRequestDTO(
    @JsonProperty("_id")
    Long id,
    @NotNull
    Titulo titulo,
    @NotNull @Temporal(TemporalType.DATE)
    Date dataAquisicao,
    @NotNull
    String tipo
) {
}
