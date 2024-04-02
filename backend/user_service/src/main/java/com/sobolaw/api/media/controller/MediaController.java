package com.sobolaw.api.media.controller;

import com.sobolaw.api.media.service.MediaService;
import com.sobolaw.global.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 미디어 Controller.
 */
@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;

    /**
     * 파일 업로드.
     * 업로드 시 UUID로 파일명 변경.
     */
    @Operation(summary = "파일 업로드 & 원본 파일 이름 저장", description = "한 개의 파일 업로드하고 원본 파일 이름을 같이 보내줍니다.", tags = { "파일" })
    @PostMapping("/image")
    public BaseResponse<?> uploadImageWithOriginalName(@RequestPart("image") MultipartFile file) {
        Map<String, String> result = mediaService.storeImage(file);
        String url = result.get("url");
        return BaseResponse.success(HttpStatus.CREATED.value(), "이미지 링크가 생성되었습니다.", url);
    }

    /**
     * 다중 파일 업로드.
     * 업로드 시 UUID로 파일명 변경.
     */
    @Operation(summary = "다중 파일 업로드 & 원본 파일 이름 저장", description = "여러 개의 파일 업로드하고 원본 파일 이름을 같이 보내줍니다.", tags = { "파일" })
    @PostMapping("/images")
    public BaseResponse<?> uploadImagesWithOriginalName(@RequestPart("image") List<MultipartFile> files) {
        Map<String, List<String>> result = mediaService.storeImagesWithOriginalName(files);
        List<String> urlList = result.get("urlList");
        return BaseResponse.success(HttpStatus.CREATED.value(), "이미지 링크가 생성되었습니다.", urlList);
    }
}
