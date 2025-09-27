import { Body, Controller, Patch } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateLessonStatusUseCase } from "./update-lesson-status.use-case";
import { UpdateLessonStatusDto } from "src/lesson/models/dtos/update-lesson-status.dto";

@ApiTags("Lesson")
@Controller("lesson")
export class UpdateLessonStatusController {
    constructor (
        private readonly updateLessonStatusUseCase: UpdateLessonStatusUseCase
    ) {}

    @Patch("/update-status")
    @ApiOperation({ summary: "Atualiza o status da aula." })
    @ApiBody({ type: UpdateLessonStatusDto })
    async update(
        @Body() body: UpdateLessonStatusDto
    ) {
        return await this.updateLessonStatusUseCase.execute(body)
    }
}