package com.brunoicaro.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.io.Serializable;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.brunoicaro.DTO.ClienteRequestDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity(name = "dependente")
@SQLDelete(sql = "UPDATE Dependente SET status = 'Inativo' WHERE id = ? ")
@Where(clause = "status = 'Ativo'")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("Dependente")
@EqualsAndHashCode(of = "id")
public class Dependente extends Cliente implements Serializable {

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "socio_id")
    private Socio socio;

    @NotNull
    @Pattern(regexp = "Ativo|Inativo")
    @Column(length = 10, nullable = false)
    private String status = "Ativo";

    public Dependente(ClienteRequestDTO requestCliente) {
        super(requestCliente);
        this.socio = requestCliente.socio();
    }

    public void setSocio(Socio socio) {
        this.socio = socio;
    }
}
