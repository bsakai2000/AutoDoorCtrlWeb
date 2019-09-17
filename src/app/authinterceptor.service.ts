import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//checks for the existence of SESSIONID cookie
		if (document.cookie.indexOf("SESSIONID") != -1) {
			//get just the token, remove extraneous information
			var sessionCookie = document.cookie.substring(document.cookie.indexOf("SESSIONID")).split(';')[0];
			var idToken = sessionCookie.split('=')[1];
			//add the token to request headers and let the request go through
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
