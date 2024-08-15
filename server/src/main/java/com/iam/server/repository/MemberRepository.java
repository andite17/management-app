package com.iam.server.repository;

import com.iam.server.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    @Query("SELECT m FROM Member m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            " OR LOWER(m.position) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Member> searchByNameOrPosition(String keyword, Pageable pageable);
}
