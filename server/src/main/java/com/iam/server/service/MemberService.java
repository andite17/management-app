package com.iam.server.service;

import com.iam.server.dto.MemberRequest;
import com.iam.server.dto.MemberResponse;
import com.iam.server.dto.PagebleResponse;
import com.iam.server.entity.Member;
import com.iam.server.repository.MemberRepository;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository repository;

    static final String BASE_URL = "http://localhost:8080";

    public String create(MemberRequest request) {
        Member member = new Member();
        member.setName(request.name());
        member.setPosition(request.position());

        if(StringUtils.isNotBlank(request.img())) {
            byte[] blobImg = Base64.getDecoder().decode(request.img());
            member.setImg(blobImg);
        }

        repository.save(member);

        return "Member added successfully";
    }

    public PagebleResponse getAllMembers(Pageable pageable) {
        Page<Member> memberPage = repository.findAll(pageable);
        List<MemberResponse> members = memberPage.get()
                .map(this::mapToResponse)
                .toList();

        return mapToPageableResponse(memberPage, members);
    }

    public PagebleResponse searchMembers(String keyword, Pageable pageable) {
        Page<Member> memberPage = repository.searchByNameOrPosition(keyword, pageable);
        List<MemberResponse> members = memberPage.get()
                .map(this::mapToResponse)
                .toList();
        return mapToPageableResponse(memberPage, members);
    }

    public MemberResponse detail(String id) {
        Member member = repository.findById(id).orElseThrow(
                ()-> new RuntimeException("Member not found"));

        return mapToResponse(member);
    }

    public String edit(String id, MemberRequest request) {
        Member member = repository.findById(id).orElseThrow(
                ()-> new RuntimeException("Member not found"));

        Member memberEdit = mergeMember(member, request);
        repository.save(memberEdit);
        return "Member updated succesfully";
    }

    public String delete(String id) {
        Member member = repository.findById(id).orElseThrow(
                ()-> new RuntimeException("Member not found"));

        repository.delete(member);
        return "Member deleted successfully";
    }

    public ResponseEntity<?> showImg(String id) {
        Member member = repository.findById(id).orElseThrow(
                ()-> new RuntimeException("Member not found"));
        if(member.getImg() == null){
            throw new RuntimeException("image not found");
        }

        byte[] imageBytes = member.getImg();

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(MediaType.IMAGE_PNG_VALUE))
                .body(imageBytes);
    }


    private PagebleResponse mapToPageableResponse(Page<Member> memberPage, List<MemberResponse> members) {
        PagebleResponse pagebleResponse = new PagebleResponse();
        pagebleResponse.setTotalData(memberPage.getTotalElements());
        pagebleResponse.setSize(memberPage.getSize());
        pagebleResponse.setTotalPage(memberPage.getTotalPages());
        pagebleResponse.setData(members);

        return pagebleResponse;
    }

    public MemberResponse mapToResponse(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getName(),
                BASE_URL.concat("/member/image/").concat(member.getId()),
                member.getPosition().toString(),
                "superior"
        );
    }

    private Member mergeMember(Member member, MemberRequest request) {
        if(StringUtils.isNotBlank(request.name())) {
            member.setName(request.name());
        }
        if(StringUtils.isNotBlank(request.position().toString())) {
            member.setPosition(request.position());
        }
        if(StringUtils.isNotBlank(request.img())) {
            byte[] blobImg = Base64.getDecoder().decode(request.img());
            member.setImg(blobImg);
        }
//        if(StringUtils.isNotBlank(request.reportTo()) {
//            member.set(request.position());
//        }
        return member;
    }
}
