$(function() {

	$.ajax({ url: '/profiles', dataType: 'json' }).done(function(data){

		$("#list").html("");

		data.forEach(function(p){

			$("#profile-template .profile-name").html(p.name);
			$("#profile-template .profile-surname").html(p.surname);
			$("#profile-template .profile-lc").html(p.lc);
			$("#profile-template .profile-rol").html(p.rol);
			$("#profile-template .profile-photo img").attr('src', '/profile/'+p.id);

			$("#list").html($("#list").html() + '<div class="profile">' + $("#profile-template").html() + '</div>');

		});

	});

});