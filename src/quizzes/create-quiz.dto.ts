export class CreateQuizDto {
    title: string;
    questions: Map<string, Array<string>>;
}
