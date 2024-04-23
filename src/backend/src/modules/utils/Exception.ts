abstract class RequestException extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

class BadRequestException extends RequestException {
    constructor(message: string) {
        super(message, 400);
    }
}

class UnauthorizedException extends RequestException {
    constructor(message: string) {
        super(message, 401);
    }
}

class ForbiddenException extends RequestException {
    constructor(message: string) {
        super(message, 403);
    }
}

class NotFoundException extends RequestException {
    constructor(message: string) {
        super(message, 404);
    }
}

class UnprocessableEntityException extends RequestException {
    constructor(message: string) {
        super(message, 422);
    }
}

class UnexpectedException extends RequestException {
    constructor(message: string) {
        super(message, 500);
    }
}

export {
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    UnprocessableEntityException,
    UnexpectedException,
}
