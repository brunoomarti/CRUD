package com.brunoicaro.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.brunoicaro.DTO.SocioRequestDTO;
import com.brunoicaro.DTO.SocioResponseDTO;
import com.brunoicaro.exception.RecordNotFoundException;
import com.brunoicaro.model.Socio;
import com.brunoicaro.repository.SocioRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class SocioService {
    
    private final SocioRepository repository;

    public SocioService(SocioRepository repository){
        this.repository = repository;
    }

    public List<SocioResponseDTO> getAll() {
        return repository.findAll().stream().map((SocioResponseDTO::new)).toList();
    }

    public SocioResponseDTO findById(@PathVariable @NotNull @Positive Long id){
        return repository.findById(id).map((SocioResponseDTO::new)).orElseThrow(() -> new RecordNotFoundException(id));
    }

    // @Transactional
    // public Socio save(@Valid SocioRequestDTO data){
    //     Socio socioData = new Socio(data);
    //     System.out.println(socioData);
    //     return repository.save(socioData);
    // }

    public Socio update(@NotNull @Positive Long id, @Valid Socio socio){
        return repository.findById(id)
                .map(recordFound -> {
                    recordFound.setNumero(socio.getNumero());
                    recordFound.setRua(socio.getRua());
                    recordFound.setBairro(socio.getBairro());
                    recordFound.setCidade(socio.getCidade());
                    recordFound.setEstado(socio.getEstado());
                    recordFound.setTelefone(socio.getTelefone());
                    recordFound.setCpf(socio.getCpf());
                    recordFound.setDependentes(socio.getDependentes());
                    return repository.save(recordFound);
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

        public void delete(@PathVariable @NotNull @Positive Long id) {
        // List<String> itensDependentes = obterItensComDependencias(id);
        
        // if (!itensDependentes.isEmpty()) {
        //     throw new ExclusaoComDependenciasException(
        //         "Este registro possui dependências em outras entidades.<br/><br/>" +
        //         "Itens dependentes: <br/>" +
        //         String.join("<br/>", itensDependentes)
        //     );
        // } else {
            repository.delete(repository.findById(id)
                    .orElseThrow(() -> new RecordNotFoundException(id)));
        // }
    }

    // private List<String> obterItensComDependencias(Long id) {
    //     Socio socio = repository.findById(id)
    //             .orElseThrow(() -> new RecordNotFoundException(id));

    //     List<String> itensComDependencias = socio.getde().stream()
    //             .map(item -> "Id: " + item.getId() + ", Data de Aquisição: " + item.getDataAquisicao())
    //             .collect(Collectors.toList());

    //     return itensComDependencias;
    // }

}
