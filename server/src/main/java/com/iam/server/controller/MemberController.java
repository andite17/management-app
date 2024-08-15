package com.iam.server.controller;

import com.iam.server.dto.MemberRequest;
import com.iam.server.dto.PagebleResponse;
import com.iam.server.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/member")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService service;

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<?> create(@Valid @RequestBody MemberRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping
    public ResponseEntity<PagebleResponse> getAllMembers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
        PagebleResponse members = service.getAllMembers(pageable);


        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<PagebleResponse> searchMembers(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
        PagebleResponse members = service.searchMembers(keyword, pageable);

        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.detail(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> create(@Valid @RequestBody MemberRequest request, @PathVariable("id") String id) {
        return ResponseEntity.ok(service.edit(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<?> showImg(@PathVariable("id") String id) {
        return service.showImg(id);
    }
}
