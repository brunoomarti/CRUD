package com.brunoicaro.DTO;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.brunoicaro.model.Dependente;
import com.brunoicaro.model.Socio;

import jakarta.validation.constraints.NotBlank;

public record ClienteRequestDTO (
        Long id,
        @NotBlank String numInscricao,
        @NotBlank String nome,
        @NotBlank String dtNascimento,
        @NotBlank String sexo,
        String status,
        String cpf,
        String telefone,
        int numero,
        String rua,
        String bairro,
        String cidade,
        String estado,
        //List<Locacao> locacoes,
        List<Dependente> dependentes,
        Socio socio,
        String tipoCliente

) {

    public Date getDataNascimento() {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            return dateFormat.parse(dtNascimento);
        } catch (Exception e) {
            return null;
        }
    }
    public Long getSocioId() {
        return socio.getId();
    }
}
