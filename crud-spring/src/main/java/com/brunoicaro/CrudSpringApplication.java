package com.brunoicaro;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.brunoicaro.repository.AtorRepository;
import com.brunoicaro.repository.ClasseRepository;
import com.brunoicaro.repository.DiretorRepository;
import com.brunoicaro.repository.TituloRepository;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.brunoicaro.repository")
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase (AtorRepository atorRepository, ClasseRepository classeRepository, DiretorRepository diretorRepository, TituloRepository tituloRepository){
		return arg->{

			
			// Ator

			// Ator a = new Ator();
			// a.setNome("Bruno");
			// Ator b = new Ator();
			// b.setNome("Icaro");
			

			// Classe 

			// Classe classe = new Classe();
			// classe.setNome("Classe 1");
			// classe.setPrazoDias(15);
			// classe.setValor(100.00);
			

			// Diretor

			// Diretor diretor1 = new Diretor();
			// diretor1.setNome("Diretor 1");
			// Diretor diretor2 = new Diretor();
			// diretor2.setNome("Diretor 2");
			// Diretor diretor3 = new Diretor();
			// diretor3.setNome("Diretor 3");


			// Titulo

			// List<Ator> atores = new ArrayList<>();
			// atores.add(a);
			// atores.add(b);

			// Titulo titulo1 = new Titulo(null);
			// titulo1.setNome("Titulo 1");
			// titulo1.setAno(2019);
			// titulo1.setAtores(atores);
			// titulo1.setCategoria("categoria");
			// titulo1.setClasse(classe);
			// titulo1.setDiretor(diretor3);
			// titulo1.setSinopse("Romeu doeu, cavalo comeu.");


			//Saves

			// atorRepository.save(a);
			// atorRepository.save(b);
			// classeRepository.save(classe);
			// diretorRepository.save(diretor1);
			// diretorRepository.save(diretor2);
			// diretorRepository.save(diretor3);
			//tituloRepository.save(titulo1);
		};
	}

}
