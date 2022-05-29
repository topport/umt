export class Result {
  static success(result: any) {
    return {
      code: 200,
      success: true,
      data: result,
      message: 'upload Success!',
    };
  }
}
