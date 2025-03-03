import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

  
    @Post('signup')
    //advantage of using @Body I don't have to worry about any framework that we are working with
    signup(@Body() dto: AuthDto){
      return this.authService.signup(dto);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto){
     return this.authService.signin(dto);
    }
}