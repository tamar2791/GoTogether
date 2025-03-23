using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Chaperone_DriverId",
                table: "Chaperone");

            migrationBuilder.AlterColumn<int>(
                name: "DriverId",
                table: "Chaperone",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Chaperone_DriverId",
                table: "Chaperone",
                column: "DriverId",
                unique: true,
                filter: "[DriverId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Chaperone_DriverId",
                table: "Chaperone");

            migrationBuilder.AlterColumn<int>(
                name: "DriverId",
                table: "Chaperone",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Chaperone_DriverId",
                table: "Chaperone",
                column: "DriverId",
                unique: true);
        }
    }
}
