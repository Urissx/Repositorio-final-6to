from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class PlayerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nick = models.CharField(max_length=50)
    favorite_game = models.CharField(max_length=100, default="EA Sports FC")
    stats = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.nick

class Tournament(models.Model):
    FORMAT_CHOICES = [
        ('SINGLE', 'Eliminación Directa'),
        ('LEAGUE', 'Liga'),
        ('GROUPS', 'Fases de Grupos'),
    ]

    name = models.CharField(max_length=200)
    game = models.CharField(max_length=100) # Ej: EA Sports FC 25
    tournament_format = models.CharField(max_length=20, choices=FORMAT_CHOICES)
    rules = models.TextField()
    prize = models.CharField(max_length=200)
    start_date = models.DateTimeField()
    max_participants = models.IntegerField(validators=[MinValueValidator(2)])
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organized_tournaments')
    participants = models.ManyToManyField(User, related_name='joined_tournaments', blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.game}"

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches')
    player1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches_as_p1')
    player2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches_as_p2', null=True, blank=True)
    score_p1 = models.IntegerField(default=0)
    score_p2 = models.IntegerField(default=0)
    result_validated = models.BooleanField(default=False)
    proof_image = models.ImageField(upload_to='results/', null=True, blank=True)
    date_scheduled = models.DateTimeField()

    def __str__(self):
        return f"{self.player1} vs {self.player2} ({self.tournament.name})"