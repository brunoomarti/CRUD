package com.brunoicaro.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brunoicaro.model.Ator;

@Repository
public interface AtorRepository extends JpaRepository<Ator,Long>{
    
}
