package com.brunoicaro.DTO;

public record ClasseRequestDTO(
    Long _id,
    String nome,
    int prazoDias,
    double valor
) {
}
