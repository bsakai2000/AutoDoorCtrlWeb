import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (document.cookie.indexOf("SESSIONID") != -1) {
			var sessionCookie = document.cookie.substring(document.cookie.indexOf("SESSIONID")).split(';')[0];
			var idToken = sessionCookie.split('=')[1];
			const cloned = req.clone({
				headers: req.headers.set("Authorization",
				"Bearer " + idToken)
			});

			return next.handle(cloned);
		}
		else {
			return next.handle(req);
		}
	}
}
