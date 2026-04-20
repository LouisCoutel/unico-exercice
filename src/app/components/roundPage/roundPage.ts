import { Component, inject, input, type OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RequestHandler } from "../../requests";
import type { Round } from "../../typing";

@Component({
	selector: "round-page",
	templateUrl: "./roundPage.html",
	imports: [],
})
export class RoundPage implements OnInit {
	private activatedRoute = inject(ActivatedRoute);
	id = signal("");
	round!: Round;
	constructor() {
		this.activatedRoute.params.subscribe((params) => {
			this.id.set(params["id"]);
		});
	}
	protected readonly requestHandler = inject(RequestHandler);

	ngOnInit(): void {
		this.requestHandler
			.oneRound(this.id())
			.subscribe((data) => (this.round = data));
	}
}
