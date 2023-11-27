package com.brunoicaro.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brunoicaro.DTO.ClienteRequestDTO;
import com.brunoicaro.model.Cliente;
import com.brunoicaro.model.Dependente;
import com.brunoicaro.model.Socio;
import com.brunoicaro.repository.ClienteRepository;
import com.brunoicaro.repository.DependenteRepository;
import com.brunoicaro.repository.SocioRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private SocioRepository socioRepository;

    @Autowired
    private DependenteRepository depedenteRepository;

    @GetMapping
    public List<Cliente> getAllCliente(){
        return clienteRepository.findAll();
    }

    @GetMapping("/socio")
    public List<Socio> getAllSocio(){
        return socioRepository.findAll();
    }

    @GetMapping("/dependente")
    public List<Dependente> getAllDepedente(){
        return depedenteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarCliente(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity setCliente(@RequestBody @Validated ClienteRequestDTO data){
        if(data.tipoCliente().equals("Socio")){
            Socio cliente = new Socio(data);
            this.socioRepository.save(cliente);
        }else if(data.tipoCliente().equals("Dependente")){

//            Socio socio = socioRepository.findById(data.getSocioId())
//                    .orElseThrow(() -> new RuntimeException("Sócio não encontrado"));
//
//            if (socio.getDependentes() != null && socio.getDependentes().size() >= 3) {
//                return ResponseEntity.badRequest().body("Um sócio não pode ter mais que 3 dependentes.");
//            }

            Dependente cliente = new Dependente(data);
            this.depedenteRepository.save(cliente);
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarCliente(@PathVariable Long id, @RequestBody @Validated ClienteRequestDTO data) {
        if(data.tipoCliente().equals("Socio")){
            Optional<Socio> optionalSocio = socioRepository.findById(id);
            if (optionalSocio.isPresent()) {
                Socio socio = getSocio(data, optionalSocio);

                socioRepository.save(socio);
                return ResponseEntity.ok(socio);
            } else {
                return ResponseEntity.notFound().build();
            }
        }else if(data.tipoCliente().equals("Dependente")){
            Optional<Dependente> optionalDependente = depedenteRepository.findById(id);
            if (optionalDependente.isPresent()) {
                Dependente dependente = getDependente(data, optionalDependente);

                depedenteRepository.save(dependente);
                return ResponseEntity.ok(dependente);
            } else {
                return ResponseEntity.notFound().build();
            }
        }
        return ResponseEntity.ok().build();
    }

    @NotNull
    private static Socio getSocio(RequestCliente data, Optional<Socio> optionalSocio) {
        Socio socio = optionalSocio.get();

        socio.setNome(data.nome());
        socio.setNumInscricao(data.numInscricao());
        socio.setDtNascimento(data.getDataNascimento());
        socio.setSexo(data.sexo());
        socio.setAtivo(data.isAtivo());
        socio.setLocacoes(data.locacoes());
        socio.setTipo(data.tipoCliente());

        socio.setCpf(data.cpf());
        socio.setTelefone(data.telefone());
        socio.setEndereco(data.endereco());
        socio.setDependentes(data.dependentes());
        return socio;
    }

    @NotNull
    private static Dependente getDependente(RequestCliente data, Optional<Dependente> optionalDependente) {
        Dependente dependente = optionalDependente.get();


        dependente.setNome(data.nome());
        dependente.setNumInscricao(data.numInscricao());
        dependente.setDtNascimento(data.getDataNascimento());
        dependente.setSexo(data.sexo());
        dependente.setAtivo(data.isAtivo());
        dependente.setLocacoes(data.locacoes());
        dependente.setTipo(data.tipoCliente());

        dependente.setSocio(data.socio());
        return dependente;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirCliente(@PathVariable Long id) {
        Optional<Cliente> optionalCliente = clienteRepository.findById(id);
        if (optionalCliente.isPresent()) {
            clienteRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}
