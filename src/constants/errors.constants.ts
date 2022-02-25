export class ErrorConstant {

    static readonly TIME_REQUIRED = new ErrorConstant(422, 1, 'Time is required in the readings', 'El tiempo es obligatorio en lecturas');
    static readonly READINGS_NUMBER = new ErrorConstant(422, 2, 'Must be at least 5 readings', 'Debe haber al menos 5 lecturas');
    
    private constructor(
        private readonly statusCode: number, 
        private readonly errorCode: number,
        private readonly srcMessage: string,
        private readonly translateMessage: string) {
    }

}