from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=200)
    nickname = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    points = models.IntegerField()
    photo = models.TextField(blank=True, null=True)
    value = models.IntegerField()
    login_date = models.DateField()
    login_count = models.IntegerField()

    class Meta:
            db_table='user'

class Point(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, models.DO_NOTHING, db_column='user_id')
    point = models.IntegerField()
    info = models.CharField(max_length=200)
    time = models.DateTimeField()

    class Meta:
            db_table='point'

class Venue(models.Model):
    id = models.IntegerField(primary_key=True)
    venue_name = models.CharField(max_length=200)
    venue_image = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=200)
    capacity = models.IntegerField()
    opened_date = models.DateField()

    class Meta:
            db_table='venue'

class Team(models.Model):
    id = models.IntegerField(primary_key=True)
    country = models.CharField(max_length=200)
    logo = models.TextField(blank=True, null=True)
    group = models.CharField(max_length=200)
    rank = models.IntegerField()
    win = models.IntegerField()
    draw = models.IntegerField()
    loss = models.IntegerField()
    points = models.IntegerField()
    last_five = models.CharField(max_length=200)
    goal_diff = models.IntegerField()
    manager = models.CharField(max_length=200)

    class Meta:
            db_table='team'

class Match(models.Model):
    id = models.IntegerField(primary_key=True)
    match_name = models.CharField(max_length=200)
    match_type = models.CharField(max_length=200)
    team1_id = models.ForeignKey(Team, models.DO_NOTHING, related_name='team1_id')
    team2_id = models.ForeignKey(Team, models.DO_NOTHING, related_name='team2_id')
    start_date = models.DateField()
    start_time = models.TimeField()
    venue_id = models.ForeignKey(Venue, models.DO_NOTHING, db_column='venue_id')
    team1_score = models.IntegerField(blank=True, null=True)
    team2_score = models.IntegerField(blank=True, null=True)

    class Meta:
            db_table='match'

class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    fullname = models.CharField(max_length=200)
    name_language = models.CharField(max_length=200)
    player_image = models.TextField(blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    birthday = models.CharField(max_length=200)
    weight = models.IntegerField()
    height = models.IntegerField()
    country_id = models.ForeignKey(Team, models.DO_NOTHING, db_column='country_id')
    current_team = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    goal = models.IntegerField()
    assist = models.IntegerField()
    yellow_card = models.IntegerField()
    red_card = models.IntegerField()
    run_time = models.IntegerField()
    value = models.IntegerField()

    class Meta:
            db_table='player'

class PlayerCard(models.Model):
    id = models.AutoField(primary_key=True)
    player_id = models.ForeignKey(Player, models.DO_NOTHING, db_column='player_id')
    user_id = models.ForeignKey(User, models.DO_NOTHING, db_column='user_id')

    class Meta:
            db_table='playercard'

class Prediction(models.Model):
    id = models.AutoField(primary_key=True)
    match_id = models.ForeignKey(Match, models.DO_NOTHING, db_column='match_id')
    bet_time = models.DateTimeField()
    user_id = models.ForeignKey(User, models.DO_NOTHING, db_column='user_id')
    user_point = models.IntegerField()
    predict = models.IntegerField()

    class Meta:
            db_table='prediction'

class Bet(models.Model): 
    id = models.OneToOneField(Match, models.DO_NOTHING, primary_key=True)
    win = models.IntegerField()
    draw = models.IntegerField()
    loss = models.IntegerField()

    class Meta:
            db_table='bet'

class EmailCert(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=200)
    cert_num = models.CharField(max_length=200)
    cert_time = models.DateTimeField()

    class Meta:
            db_table='emailcert'