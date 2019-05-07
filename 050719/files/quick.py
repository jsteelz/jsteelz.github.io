import csv

with open("lime_scooter_trips_origin_reghrs.csv", 'rb') as i, open('new-origs.csv', 'wb') as o:
    r = csv.DictReader(i)
    writer = csv.DictWriter(o, r.fieldnames)
    writer.writeheader()

    for line in r:
        if '7/26/18' in line['startts']:
            writer.writerow(line)

with open("lime_scooter_trips_dest_reghrs.csv", 'rb') as i, open('new-dests.csv', 'wb') as o:
    r = csv.DictReader(i)
    writer = csv.DictWriter(o, r.fieldnames)
    writer.writeheader()

    for line in r:
        if '7/26/18' in line['startts']:
            writer.writerow(line)
