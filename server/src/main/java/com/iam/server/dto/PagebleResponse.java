package com.iam.server.dto;

import lombok.Data;

import java.util.List;

@Data
public class PagebleResponse{
    private long totalPage;
    private long totalData;
    private long size;
    private List data;
}
