using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CPM.Repository.Migrations
{
	public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Car",
                columns: table => new
                {
                    CarId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Color = table.Column<string>(nullable: true),
                    Plates = table.Column<string>(nullable: true),
                    SeatsNumber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Car", x => x.CarId);
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    IsDriver = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "TravelPlan",
                columns: table => new
                {
                    TravelPlanId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StartLocation = table.Column<string>(nullable: true),
                    EndLocation = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    CarId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TravelPlan", x => x.TravelPlanId);
                    table.ForeignKey(
                        name: "FK_TravelPlan_Car_CarId",
                        column: x => x.CarId,
                        principalTable: "Car",
                        principalColumn: "CarId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TravelPlanEmployee",
                columns: table => new
                {
                    TravelPlanId = table.Column<int>(nullable: false),
                    EmployeeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TravelPlanEmployee", x => new { x.TravelPlanId, x.EmployeeId });
                    table.ForeignKey(
                        name: "FK_TravelPlanEmployee_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TravelPlanEmployee_TravelPlan_TravelPlanId",
                        column: x => x.TravelPlanId,
                        principalTable: "TravelPlan",
                        principalColumn: "TravelPlanId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Car_Plates",
                table: "Car",
                column: "Plates",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TravelPlan_CarId",
                table: "TravelPlan",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_TravelPlanEmployee_EmployeeId",
                table: "TravelPlanEmployee",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TravelPlanEmployee");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "TravelPlan");

            migrationBuilder.DropTable(
                name: "Car");
        }
    }
}
