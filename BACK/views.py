from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Tournament, Match

def tournament_list(request):
    # BUSCAR: Filtra por juego si el usuario usa el buscador
    query = request.GET.get('q')
    if query:
        tournaments = Tournament.query.filter(game__icontains=query)
    else:
        tournaments = Tournament.objects.all()
    return render(request, 'tournaments/list.html', {'tournaments': tournaments})

@login_required
def join_tournament(request, tournament_id):
    tournament = get_object_or_404(Tournament, id=tournament_id)
    if tournament.participants.count() < tournament.max_participants:
        tournament.participants.add(request.user)
        # Aquí podrías enviar una notificación
    return redirect('tournament_detail', pk=tournament.id)

@login_required
def submit_result(request, match_id):
    match = get_object_or_404(Match, id=match_id)
    if request.method == 'POST':
        match.score_p1 = request.POST.get('score1')
        match.score_p2 = request.POST.get('score2')
        match.save()
        return redirect('tournament_bracket', tournament_id=match.tournament.id)
    return render(request, 'tournaments/submit_result.html', {'match': match})
