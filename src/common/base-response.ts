// Base response dto for all responses

import { ApiProperty } from '@nestjs/swagger';

export class BaseAPIResponse {
  constructor(status?: string, message?: string) {
    this.status = status;
    this.message = message;
  }

  @ApiProperty({
    name: 'status',
    description: 'Status of the operation requested',
  })
  public status: string;

  @ApiProperty({
    name: 'message',
    description:
      'Detailed information about the status of the operation requested',
  })
  public message: string;
}
