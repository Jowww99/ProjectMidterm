// ========== POPUP FUNCTIONS ==========

// Function to open a popup
function openPopup(section) {
    document.getElementById(section + '-overlay').classList.add('active');
}

// Function to close a popup
function closePopup(section) {
    document.getElementById(section + '-overlay').classList.remove('active');
}

// Close popup when clicking outside the popup box
document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.overlay').forEach(overlay => {
            overlay.classList.remove('active');
        });
        // Also close music player with Escape
        closeMusicPlayer();
    }
});

// ========== MUSIC PLAYER FUNCTIONS ==========

// Function to open music player
function openMusicPlayer() {
    document.getElementById('music-player').classList.add('active');
    // Initialize the player when opened for the first time
    if (!window.playerInitialized) {
        initializeMusicPlayer();
        window.playerInitialized = true;
    }
}

// Function to close music player
function closeMusicPlayer() {
    document.getElementById('music-player').classList.remove('active');
}

// ========== MUSIC PLAYER ==========

// Music data
const musicData = {
    favorites: {
        title: "Oasis",
        coverImage: "oasis.jpg",
        songs: [
            { title: "Wonderwall", artist: "Oasis", duration: "4:18", src: "Wonderwall (Remastered).mp3" },
            { title: "Stop Crying Your Heart Out", artist: "Oasis", duration: "5:03", src: "Stop Crying Your Heart Out (Remastered).mp3" },
            { title: "Don't Look Back in Anger", artist: "Oasis", duration: "4:47", src: "Oasis - Dont Look Back in Anger.mp3" },
            { title: "Champagne Supernova", artist: "Oasis", duration: "7:29", src: "Champagne Supernova (Remastered).mp3" },
            { title: "Married With Children", artist: "Oasis", duration: "3:15", src: "Married With Children (Remastered).mp3" }
        ]
    },
    rock: {
        title: "Juan Karlos",
        coverImage: "Jk.jpg",
        songs: [
            { title: "Limang Taon", artist: "Juan Karlos", duration: "5:13", src: "Limang Taon.mp3" },
            { title: "Bukas", artist: "Juan Karlos", duration: "4:12", src: "Bukas.mp3" },
            { title: "Shot Puno", artist: "Juan Karlos", duration: "4:39", src: "SHOT PUNO.mp3" },
            { title: "Kasing kasing (feat. Kyle Echari)", artist: "Juan Karlos", duration: "4:59", src: "Kasing kasing (feat. Kyle Echarri) .mp3" },
            { title: "Gabi (feat. Zild)", artist: "Juan Karlos", duration: "5:28", src: "gabi.mp3" }
        ]
    },
    pop: {
        title: "My Chemical Romance",
        coverImage: "Mcr.jpg",
        songs: [
            { title: "Helena", artist: "My Chemical Romance", duration: "3:29", src: "Helena.mp3" },
            { title: "Famous Last Words", artist: "My Chemical Romance", duration: "4:21", src: "FamousLastWords.mp3" },
            { title: "I Don't Love You", artist: "My Chemical Romance", duration: "3:58", src: "idont.mp3" },
            { title: "Cancer", artist: "My Chemical Romance", duration: "2:22", src: "Cancer.mp3" },
            { title: "Disenchanted", artist: "My Chemical Romance", duration: "4:55", src: "Disenchanted.mp3" }
        ]
    },
    chill: {
        title: "Syd Hartha",
        coverImage: "syd.jpg",
        songs: [
            { title: "Tila tala", artist: "Syd Hartha", duration: "4:40", src: "tila tala.mp3" },
            { title: "Damdamin!", artist: "Syd Hartha", duration: "3:50", src: "damdamin!.mp3" },
            { title: "3:15 (feat. Kiyo)", artist: "Syd Hartha", duration: "4:10", src: "3_15(feat.kiyo).mp3" },
            { title: "Paruparo", artist: "Syd Hartha", duration: "3:47", src: "paruparo.mp3" },
            { title: "Panalangin", artist: "Syd Hartha", duration: "2:42", src: "panalangin.mp3" }
        ]
    },
    workout: {
        title: "Radiohead",
        coverImage: "rh.jpg",
        songs: [
            { title: "Creep", artist: "Radiohead", duration: "3:56", src: "creep.mp3" },
            { title: "No Surprises", artist: "Radiohead", duration: "3:47", src: "ns.mp3" },
            { title: "Fake Plastic Trees", artist: "Radiohead", duration: "4:52", src: "fps.mp3" },
            { title: "High and Dry", artist: "Radiohead", duration: "4:19", src: "hidry.mp3" },
            { title: "Let Down", artist: "Radiohead", duration: "4:59", src: "letdown.mp3" },
            { title: "Past Lives", artist: "Radiohead", duration: "1:46", src: "pastlives.mp3" }

        ]
    }
};

// Simple state management
let currentPlaylist = 'favorites';
let currentTrackIndex = 0;

// Initialize music player
function initializeMusicPlayer() {
    // Get elements
    const audio = document.getElementById('player-main-audio');
    const audioSource = document.getElementById('player-audio-source');
    const artistButtons = document.querySelectorAll('.player-artist-button');
    const artistName = document.getElementById('player-artist-name');
    const trackCount = document.getElementById('player-track-count');
    const albumArt = document.getElementById('player-album-artwork');
    const trackRows = document.getElementById('player-track-rows');
    const currentTitle = document.getElementById('player-current-title');
    const currentArtist = document.getElementById('player-current-artist');

    // Load playlist function
    window.loadPlaylist = function(playlistKey) {
        currentPlaylist = playlistKey;
        const playlist = musicData[playlistKey];
        
        // Update UI
        artistName.textContent = playlist.title;
        trackCount.textContent = `${playlist.songs.length} tracks`;
        
        // Update album art
        albumArt.innerHTML = playlist.coverImage ?
            `<img src="${playlist.coverImage}" alt="Album cover">` :
            '<div id="player-placeholder-art">♪</div>';
        
        // Build track list
        trackRows.innerHTML = playlist.songs.map((song, index) =>
            `<tr class="player-track-row" onclick="playTrack(${index})">
                <td class="player-track-number">${index + 1}</td>
                <td class="player-track-title">${song.title}</td>
                <td class="player-track-duration">${song.duration}</td>
            </tr>`
        ).join('');
    }

    // Play track function
    window.playTrack = function(index) {
        const playlist = musicData[currentPlaylist];
        const track = playlist.songs[index];
        
        if (!track) return;
        
        currentTrackIndex = index;
        
        // Update audio source
        audioSource.src = track.src;
        audio.load();
        
        // Update current track display
        currentTitle.textContent = track.title;
        currentArtist.textContent = track.artist;
        
        // Update visual state
        document.querySelectorAll('.player-track-row').forEach(row => row.classList.remove('playing'));
        document.querySelectorAll('.player-track-row')[index].classList.add('playing');
        
        // Play the track
        audio.play().catch(e => console.log('Playback failed:', e));
    }

    // Auto-advance to next track when current track ends
    audio.addEventListener('ended', () => {
        const playlist = musicData[currentPlaylist];
        const nextIndex = (currentTrackIndex + 1) % playlist.songs.length;
        playTrack(nextIndex);
    });

    // Artist selection
    artistButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update selected state
            artistButtons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
            
            // Load new playlist
            loadPlaylist(button.dataset.playlist);
        });
    });

    // Initialize with first playlist
    loadPlaylist(currentPlaylist);

}
