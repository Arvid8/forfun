$(document).ready(function() {
    var servers = ["Aegwynn", "Aerie Peak", "Agamaggan", "Aggra (Português)", "Aggramar", "AhnQiraj", "AlAkir", "Alexstrasza", "Alleria", "Alonsus", "Amanthul", "Ambossar", "Antonidas", "Anubarak", "Arakarahm", "Arathi", "Arathor", "Archimonde", "Area 52", "Argent Dawn", "Arthas", "Arygos", "Ashenvale", "Aszune", "Auchindoun", "AzjolNerub", "Azshara", "Azuregos", "Azuremyst", "Baelgun", "Blackhand", "Blackmoore", "Blackrock", "Blackscar", "Blade's Edge", "Bladefist", "Bloodfeather", "Bloodhoof", "Booty Bay", "Borean Tundra", "Bronze Dragonflight", "Burning Blade", "Burning Legion", "CThun", "Chamber of Aspects", "Chants éternels", "Chogall", "Colinas Pardas", "Confrérie du Thorium", "Conseil des Ombres", "Dalaran", "Darkmoon Faire", "Darksorrow", "Darkspear", "Das Konsortium", "Deathguard", "Deathwing", "Deepholm", "Defias Brotherhood", "Dentarg", "Der Mithrilorden", "Destromath", "Dethecus", "Die Aldor", "Die Nachtwache", "Die Silberne Hand", "Doomhammer", "Draenor", "Dragonblight", "Dragonmaw", "DrekThar", "Dun Modr", "Dun Morogh", "Durotan", "Echsenkessel", "Eitrigg", "Elune", "Emerald Dream", "Eredar", "Eversong", "Exodar", "Fordragon", "Frostmane", "Frostwolf", "Galakrond", "Garona", "Garrosh", "Gilneas", "Goldrinn", "Gordunni", "Greymane", "Grom", "Howling Fjord", "Hyjal", "Kazzak", "Khaz Modan", "Kilrogg", "Kirin Tor", "Lightbringer", "Lordaeron", "Madmortem", "Magtheridon", "Malfurion", "Malorne", "Medivh", "Moonglade", "Nemesis", "Outland", "Perenolde", "Pozzo dell'Eternità", "Ragnaros", "Ravencrest", "Sanguino", "Silvermoon", "Soulflayer", "Stormscale", "Sylvanas", "Thrall", "Thunderhorn", "Todeswache", "Twisting Nether", "Ysondre", "Anetheron", "Deathweaver", "Borean Tundra", "Deathguard", "Deepholm", "Eversong", "Greymane", "Goldrinn", "Grom"];

    var clientID = '1e4af052f2c54d1ebf589555acbd0032';
    var clientSecret = 'ICIsg1Tao28cB5TpltU2vO1h763qnp4Y';

    $.ajax({
        url: 'https://us.battle.net/oauth/token',
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(clientID + ':' + clientSecret));
        },
        data: 'grant_type=client_credentials'
    }).done(function(response) {
        // getting auth token, do stuff here
        var token = response.access_token;
        var s = 0;
        var storeData = {};
        servers.forEach(function(element, itr, array) {
            var server = element;
            var api = 'https://eu.api.blizzard.com/wow/auction/data/' + server + '?locale=en_GB&access_token=' + token;

            $.getJSON(api, function(response) {
                // last api call
                var url = response.files[0].url
                var lastM = response.files[0].lastModified;
                //$('#container').append('<div> ' + server + " done </div>");
                //$('#container').append('<div> ' + url + '</div>');

                storeData[itr] = [server, url, lastM];
                if (itr == array.length - 1) {
                    //$('#container').append(JSON.stringify(storeData, null, 4));
                    $.ajax({
                        type: "POST",
                        url: 'saveLinks.php',
                        data: storeData,
                        success: function(result) {
                            if (result !== '') {
                                console.log(JSON.stringify(result, null, 4));
                            }
                        }
                    });
                }
            });
        });
    });
});
