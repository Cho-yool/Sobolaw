package com.sobolaw.feign.dto;

import lombok.Data;

@Data
public class BaseResponse<T> {

    private int status;
    private String message;
    private T data;

}
