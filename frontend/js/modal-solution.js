$(document).on("hidden.bs.modal", ".modal", function (e) {
	if (!$(e.target).is(".local-modal")) {
		$(e.target).removeData("bs.modal").find(".modal-content").empty();
	}
});