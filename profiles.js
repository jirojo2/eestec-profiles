
exports.next_id = 0;

// Class
exports.profile = function () {

	var id      = ++exports.next_id; // Auto value
	var name    = "";
	var surname = "";
	var photo   = ""; // Path
	var rol     = "";
	var lc      = "";

	return {

		// Getters
		id: function(v) {
			return v? id=v: id;
		},
		name: function(v) {
			return v? name=v: name;
		},
		surname: function(v) {
			return v? surname=v: surname;
		},
		photo: function(v) {
			return v? photo=v: photo;
		},
		rol: function(v) {
			return v? rol=v: rol;
		},
		lc: function(v) {
			return v? lc=v: rol;
		},

		// Methods
		load: function(data) {
			if (!data.id)
				return;

			if (data.id > exports.next_id)
				exports.next_id = data.id;

			id     (data.id     );
			name   (data.name   );
			surname(data.surname);
			photo  (data.photo  );
			rol    (data.rol    );
			lc     (data.lc     );

		}

	};
}