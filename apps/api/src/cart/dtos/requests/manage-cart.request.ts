import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ManageCartRequest {
  @ApiProperty({
    description: 'The session ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  sessionId: string;

  @ApiProperty({
    description: 'The product ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  productId: string;
}
