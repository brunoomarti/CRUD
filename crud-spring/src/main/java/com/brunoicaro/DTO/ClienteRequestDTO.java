package com.brunoicaro.DTO;

import java.util.Date;

public record ClienteRequestDTO(
    Long _id,
    String nome,
    String sexo,
    Date dataNascimento
) {
}
