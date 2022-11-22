package com.backend.domain.user.api;

import com.backend.domain.user.application.UserService;
import com.backend.domain.user.domain.User;
import com.backend.domain.user.dto.TestUserResponseDto;
import com.backend.domain.user.dto.UserLoginResponseDto;
import com.backend.domain.user.dto.UserPatchDto;
import com.backend.domain.user.dto.UserPostDto;
import com.backend.domain.user.mapper.UserMapper;
import com.backend.global.annotation.CurrentUser;
import com.backend.global.config.auth.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;

    /**
     * 회원가입
     * @param userPostDto 회원가입 정보
     */
    @PostMapping()
    public ResponseEntity<?> signup(@RequestBody UserPostDto userPostDto) {

        User user = mapper.userPostDtoToUser(userPostDto);
        userService.createUser(user);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/login")
                .build()
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    /**
     * Refresh Token을 이용하여 Access Token을 재발급 받는다.
     *
     * @param request  Refresh Token을 담고 있는 HttpServletRequest
     * @param response Access Token을 담아 반환할 HttpServletResponse
     * @return 재발급 받은 User 정보
     */
    @GetMapping("/reissue")
    public ResponseEntity<UserLoginResponseDto> reissue(HttpServletRequest request,
                                                        HttpServletResponse response) {
        String refreshToken = request.getHeader("refreshToken");

        return ResponseEntity.ok(userService.createAccessToken(refreshToken, response));
    }

    @PatchMapping
    public ResponseEntity<?> update(@CurrentUser CustomUserDetails customUserDetails,
                                    @RequestBody UserPatchDto userPatchDto) {
        User user = mapper.userPatchDtoToUser(userService, userPatchDto);
        userService.updateUser(user);

        return ResponseEntity.ok().build();
    }

    /**
     * 로그아웃 시 토큰 삭제
     *
     * @param user 현재 유저
     */
    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@CurrentUser CustomUserDetails user) {
        Long userId = user.getUser().getUserId();
        log.info("userId : {}", userId);

        userService.logout(userId);
        log.info("로그아웃 성공");
        return ResponseEntity.ok().build();
    }

    /**
     * 테스트 회원 생성
     * @return 생성된 회원 정보
     */
    @GetMapping("/test/user")
    public ResponseEntity<TestUserResponseDto> createTestUser() {

        String testAccountRole = "ROLE_USER_TEST";

        TestUserResponseDto testUserResponseDto = userService.signupTestAccount(testAccountRole);

        return ResponseEntity.ok(testUserResponseDto);
    }

    /**
     * 테스트 관리자 생성
     * @return 생성된 관리자 정보
     */
    @GetMapping("/test/admin")
    public ResponseEntity<TestUserResponseDto> createTestAdmin() {

        String testAccountRole = "ROLE_ADMIN_TEST";

        TestUserResponseDto testUserResponseDto = userService.signupTestAccount(testAccountRole);

        return ResponseEntity.ok(testUserResponseDto);
    }

//    -------------- 테스트 --------------
//    // RefreshToken 헤더 값 받아서 유저 정보 반환
//    @GetMapping("/test/refresh-token")
//    public ResponseEntity<String> testRefreshToken(HttpServletRequest request) {
//
//        String refreshToken = request.getHeader("refreshToken");
//        log.info("refreshToken: {}", refreshToken);
//        String responseLoginUserInfo = userService.headerTokenGetClaimTest(refreshToken);
//        log.info("responseLoginUserInfo: {}", responseLoginUserInfo);
//        return ResponseEntity.ok(responseLoginUserInfo);
//    }
//
//    @GetMapping("/test/access-token")
//    public ResponseEntity<String> testAccessToken(HttpServletRequest request,
//                                                  @CurrentUser CustomUserDetails authUser) {
//
//        User user = authUser.getUser();
//
//        String responseLoginUserInfo = userService.atkUserInfo(user);
//
//        return ResponseEntity.ok(responseLoginUserInfo);
//    }

}
