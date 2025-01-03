using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ispit",
                columns: table => new
                {
                    id_ispita = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv_ispita = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datum_i_vreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    id_predmeta = table.Column<int>(type: "int", nullable: true),
                    id_ucionice = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ispit", x => x.id_ispita);
                });

            migrationBuilder.CreateTable(
                name: "Izbor_maturskog_rada",
                columns: table => new
                {
                    id_izbor_maturskog_rada = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_teme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datum_predaje = table.Column<DateTime>(type: "datetime2", nullable: true),
                    datum_odobrenja = table.Column<DateTime>(type: "datetime2", nullable: true),
                    putanja_do_fajla = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Izbor_maturskog_rada", x => x.id_izbor_maturskog_rada);
                });

            migrationBuilder.CreateTable(
                name: "Komisija",
                columns: table => new
                {
                    id_komisije = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_predsendnika = table.Column<int>(type: "int", nullable: false),
                    id_mentora = table.Column<int>(type: "int", nullable: false),
                    id_prvog_clana = table.Column<int>(type: "int", nullable: false),
                    id_drugog_clana = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Komisija", x => x.id_komisije);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    id_korisnika = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    prezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    i_mejl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lozinka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    uloga = table.Column<int>(type: "int", nullable: false),
                    vreme_kreiranja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    vreme_izmene = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.id_korisnika);
                });

            migrationBuilder.CreateTable(
                name: "Odbrana_maturskog_rada",
                columns: table => new
                {
                    id_odbrana_maturskog_rada = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    datum_i_vreme = table.Column<DateTime>(type: "datetime2", nullable: true),
                    id_komisije = table.Column<int>(type: "int", nullable: false),
                    id_teme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    id_ucionice = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Odbrana_maturskog_rada", x => x.id_odbrana_maturskog_rada);
                });

            migrationBuilder.CreateTable(
                name: "Odeljenje",
                columns: table => new
                {
                    id_odeljenja = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    id_razredni_staresina = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Odeljenje", x => x.id_odeljenja);
                });

            migrationBuilder.CreateTable(
                name: "Predmet",
                columns: table => new
                {
                    id_predmeta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    id_razreda = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Predmet", x => x.id_predmeta);
                });

            migrationBuilder.CreateTable(
                name: "Profesor_predmet",
                columns: table => new
                {
                    id_profesor_predmet = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_korisnika = table.Column<int>(type: "int", nullable: false),
                    id_predmeta = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profesor_predmet", x => x.id_profesor_predmet);
                });

            migrationBuilder.CreateTable(
                name: "Razred",
                columns: table => new
                {
                    id_razreda = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    razred = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Razred", x => x.id_razreda);
                });

            migrationBuilder.CreateTable(
                name: "RefreshToken",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    userId = table.Column<int>(type: "int", nullable: false),
                    isRevoked = table.Column<bool>(type: "bit", nullable: false),
                    expiration = table.Column<DateTime>(type: "datetime2", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshToken", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Ucenik",
                columns: table => new
                {
                    id_ucenik = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_korisnik = table.Column<int>(type: "int", nullable: false),
                    id_razred = table.Column<int>(type: "int", nullable: false),
                    id_odeljenja = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ocena_obavezni = table.Column<int>(type: "int", nullable: true),
                    ocena_izborni = table.Column<int>(type: "int", nullable: true),
                    ocena_maturski = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ucenik", x => x.id_ucenik);
                    table.ForeignKey(
                        name: "FK_Ucenik_Korisnik_id_korisnik",
                        column: x => x.id_korisnik,
                        principalTable: "Korisnik",
                        principalColumn: "id_korisnika",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tema",
                columns: table => new
                {
                    id_teme = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    id_predmeta = table.Column<int>(type: "int", nullable: false),
                    id_profesora = table.Column<int>(type: "int", nullable: false),
                    id_ucenika = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tema", x => x.id_teme);
                    table.ForeignKey(
                        name: "FK_Tema_Korisnik_id_profesora",
                        column: x => x.id_profesora,
                        principalTable: "Korisnik",
                        principalColumn: "id_korisnika",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tema_Predmet_id_predmeta",
                        column: x => x.id_predmeta,
                        principalTable: "Predmet",
                        principalColumn: "id_predmeta",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tema_Ucenik_id_ucenika",
                        column: x => x.id_ucenika,
                        principalTable: "Ucenik",
                        principalColumn: "id_ucenik");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tema_id_predmeta",
                table: "Tema",
                column: "id_predmeta");

            migrationBuilder.CreateIndex(
                name: "IX_Tema_id_profesora",
                table: "Tema",
                column: "id_profesora");

            migrationBuilder.CreateIndex(
                name: "IX_Tema_id_ucenika",
                table: "Tema",
                column: "id_ucenika");

            migrationBuilder.CreateIndex(
                name: "IX_Ucenik_id_korisnik",
                table: "Ucenik",
                column: "id_korisnik");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ispit");

            migrationBuilder.DropTable(
                name: "Izbor_maturskog_rada");

            migrationBuilder.DropTable(
                name: "Komisija");

            migrationBuilder.DropTable(
                name: "Odbrana_maturskog_rada");

            migrationBuilder.DropTable(
                name: "Odeljenje");

            migrationBuilder.DropTable(
                name: "Profesor_predmet");

            migrationBuilder.DropTable(
                name: "Razred");

            migrationBuilder.DropTable(
                name: "RefreshToken");

            migrationBuilder.DropTable(
                name: "Tema");

            migrationBuilder.DropTable(
                name: "Predmet");

            migrationBuilder.DropTable(
                name: "Ucenik");

            migrationBuilder.DropTable(
                name: "Korisnik");
        }
    }
}
